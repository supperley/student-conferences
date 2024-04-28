import React, { useEffect } from 'react';
import useSwitchTheme from '../../hooks/useSwitchTheme';
import { Switch } from '@nextui-org/react';
import { SunIcon } from '../../shared/assets/icons/SunIcon';
import { MoonIcon } from '../../shared/assets/icons/MoonIcon';

export const SwitchTheme = () => {
  const [colorTheme, setColorTheme] = useSwitchTheme();
  const [isSelected, setIsSelected] = React.useState(colorTheme !== 'dark');

  useEffect(() => {
    isSelected ? setColorTheme('dark') : setColorTheme('light');
  }, [isSelected, setColorTheme]);

  return (
    <div>
      <Switch
        color="#008a5e"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        isSelected={isSelected}
        onValueChange={setIsSelected}></Switch>
    </div>
  );
};
