import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ReusableForm from '@/components/ReusableForm';

const DashboardPage = () => {
  return (
    <div className='min-h-[90vh] p-5'>
      <div className='flex justify-between'>
        <div>
          <h2>Dashboard</h2>
        </div>
        <div>
          Modes
          <ToggleGroup type='single'>
            <ToggleGroupItem value='founder'>Founder</ToggleGroupItem>
            <ToggleGroupItem value='validator'>Validator</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div>
        <ReusableForm />
      </div>
    </div>
  );
};

export default DashboardPage;
