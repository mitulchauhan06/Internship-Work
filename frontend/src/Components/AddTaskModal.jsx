import React from 'react'
import {useState , useEffect} from "react"
import {motion , AnimatePresence} from "framer-motion"
import useAiStore from '../store/aiStore'

 const AddTaskModal = ({onClose , onAdd}) => {
    const [title , setTitle] = useState("");
    const [priority , setPriority] = useState("low");
  
    const [aiSuggestion , setAiSuggestion] = useState("");
    const [showSuggestions , setShowSuggestions] = useState(false);
    const [apiError , setApiError] = useState("");
    const {openAIKey , isLoading , setLoading , isKeyLoaded, fetchKeyFromBackend} = useAiStore();

  useEffect(() => {
    console.log('OpenAI Key from store:', openAIKey ? 'LOADED' : 'MISSING');
    
    // Try to fetch key from backend if not available
    if (!openAIKey && !isKeyLoaded) {
        fetchKeyFromBackend().then(success => {
            if (success) {
                console.log('OpenAI key successfully loaded from backend');
            } else {
                console.log('OpenAI key could not be loaded from backend');
                setApiError("OpenAI key is not configured. Please check your backend setup.");
            }
        });
    }
}, [openAIKey, isKeyLoaded, fetchKeyFromBackend]);
    

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title.trim()) return;

  try {
    // Send task to backend API
    const response = await fetch('http://localhost:3001/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        priority,
        status: "todo"
      }),
    });

    if (!response.ok) throw new Error('Failed to add task');
    
    const newTask = await response.json();
    const normalizedTask = {
  ...newTask,
  id: newTask._id || newTask.id || Date.now(),
  priority: newTask.priority
    };
    console.log("Sending to onAdd:", normalizedTask); 
    onAdd(normalizedTask);  // Update frontend state
    onClose();

  } catch (error) {
    console.error("API Error:", error);
    alert("Failed to save task");
  }
};



  const fetchAISuggestions = async () => {
    if(!title.trim()) return alert("Enter the some text first");

    
    if(!openAIKey) {
      setApiError("openAI key is not configured");
      return;
    }
    setLoading(true);
    setApiError(null);
    setShowSuggestions(false);
    try{
        console.log('Using OpenAI Key ending with:', openAIKey.slice(-4));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: "POST" ,
        headers:{
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${openAIKey.trim()}`,
        },
        body:JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "system",
            content:"suggest 3 task titles based on user input . respond with just the title separated by newlines.",
          },{
            role: "user",
            content: `Suggest task similar to : "${title}"`,
          }],
          max_tokens: 60,
          temperature:0.5
        }),
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to get AI suggestions')
      }

      const data = await response.json();
      const suggestions = data.choices?.[0]?.message?.content
        .split('\n')
        .filter(s => s.trim())
        .slice(0, 3);

      setAiSuggestion(suggestions || []);
      setShowSuggestions(true)
    } catch (error) {
      console.error("AI Error:", error);
      setApiError(error.message)
      setAiSuggestion([])
    } finally {
      setLoading(false);
    



    }



  };

   const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modal = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25 } }
  };


  const handleSuggestionClick = (suggestion) => {
    setTitle(suggestion)
    setShowSuggestions(false)
  }




  return (
          <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          variants={modal}
        >

        <h2 className='text-2xl font-bold mb-4 '>Add New Task</h2>
        <form onSubmit={handleSubmit} className=' p-6 space-y-4'>
          <div className="relative">
            <input
            type='text'
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder='enter task title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}/>

            <button
                type="button"
                onClick={fetchAISuggestions}
                disabled={isLoading}
                className={`absolute right-2 top-2 px-3 py-1 rounded-md text-sm ${
                  isLoading ? 'bg-indigo-400' : 'bg-indigo-100 hover:bg-indigo-200'
                } text-indigo-700 transition-colors`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Thinking...
                  </span>
                ) : (
                  '✨ AI Suggest'
                )}
              </button>
            </div>

            {apiError && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                  AI Error: {apiError}
                </div>
              )}

              {showSuggestions && aiSuggestion.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">AI Suggestions:</h3>
                  <ul className="space-y-1">
                    {aiSuggestion.map((suggestion, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            <select 
            className='w-full p-2 border rounded'
            value={priority}
            onChange ={(e) => setPriority(e.target.value)}>
                <option value="low" > Low Priority</option>
                    <option value="medium" > medium Priority</option>
                        <option value="high"> High Priority</option>
            </select>

            <div className ="flex justify-end gap-2">
                <button
                type='button' onClick={onClose} className='px-4 py-2 bg-gray-300 rounded'>
                    Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
              Add Task
            </button>
            </div>
        </form>
         </motion.div>
      </motion.div>
    </AnimatePresence>
      
    
  )
}

export default AddTaskModal
