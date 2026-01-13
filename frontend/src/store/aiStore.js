import {create} from 'zustand';

const useAiStore = create((set, get) => ({
    openAIKey: '',
    isLoading: false,
    isKeyLoaded: false,
    
    setOpenAIKey: (key) => {
        if (key && key.startsWith('sk-')) {
            set({ openAIKey: key, isKeyLoaded: true });
        } else {
            console.error('Invalid OpenAI key format');
            set({ isKeyLoaded: true });
        }
    },
    
    setLoading: (loading) => set({ isLoading: loading }),
    
    fetchKeyFromBackend: async () => {
        try {
            set({ isLoading: true });
            const response = await fetch('http://localhost:3001/api/config/openai-key');
            
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.key && data.key.startsWith('sk-')) {
                    set({ openAIKey: data.key, isKeyLoaded: true });
                    console.log('OpenAI key fetched from backend');
                    return true;
                }
            }
            set({ isKeyLoaded: true });
            return false;
        } catch (error) {
            console.error('Failed to fetch OpenAI key from backend:', error);
            set({ isKeyLoaded: true });
            return false;
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default useAiStore;