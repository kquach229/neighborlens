import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import IdeaForm from './IdeaForm';
import { useDialogStore } from '@/stores/dialogStore';

const CreateIdeaButton = () => {
  const { openDialog } = useDialogStore();
  const [credits, setCredits] = useState<number | null>(null);

  const fetchCredits = async () => {
    try {
      const res = await fetch('/api/user/credits');
      const data = await res.json();
      setCredits(data.credits);
    } catch (error) {
      console.error('Failed to fetch credits', error);
      setCredits(0);
    }
  };

  useEffect(() => {
    fetchCredits();

    const handleCreditsUpdate = () => {
      fetchCredits();
    };

    window.addEventListener('credits-updated', handleCreditsUpdate);
    return () => {
      window.removeEventListener('credits-updated', handleCreditsUpdate);
    };
  }, []);

  return (
    <Button
      onClick={() =>
        openDialog(IdeaForm, { title: 'Create Your Idea', setCredits })
      }>
      Create Idea
    </Button>
  );
};

export default CreateIdeaButton;
