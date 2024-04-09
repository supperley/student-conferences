import React, { useEffect, useState } from 'react';
import useSwitchTheme from '../useSwitchTheme';
import { Switch } from '@nextui-org/react';
import { SunIcon } from '../../../../shared/assets/icons/SunIcon';
import { MoonIcon } from '../../../../shared/assets/icons/MoonIcon';

export const SwitchTheme = () => {
  const [colorTheme, setTheme] = useSwitchTheme();
  const [isSelected, setIsSelected] = React.useState(colorTheme !== 'dark');

  useEffect(() => {
    isSelected ? setTheme('dark') : setTheme('light');
  }, [isSelected, setTheme]);

  return (
    <div>
      <Switch
        color="success"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        isSelected={isSelected}
        onValueChange={setIsSelected}></Switch>
    </div>
  );
};
