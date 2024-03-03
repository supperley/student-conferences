import { Card } from '@nextui-org/react';
import { SwitchTheme } from '../../features/theme/switchTheme/ui/SwitchTheme';

const Settings = () => {
  return (
    <div className="mt-10">
      <Card className="h-[400px]">
        <SwitchTheme></SwitchTheme>
      </Card>
    </div>
  );
};

export default Settings;
