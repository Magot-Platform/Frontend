import React, { useContext } from 'react';
import { languageOptions } from '../languages';
import { LanguageContext } from '../containers/Language';

import USAFlag from '../../images/usa.png';
import FRFlag from '../../images/fr.png';

export default function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  const handleLanguageChange = e => userLanguageChange(e.target.value);
  return (
    <div className='flex gap-2'>
      {userLanguage === 'en' ? <img src={USAFlag} width='25' alt='' /> :
      <img src={FRFlag} width='25' alt='' />}
      <select
        className='dark:text-white dark:bg-slate-800'
        onChange={handleLanguageChange}
        value={userLanguage}
      >
        {Object.entries(languageOptions).map(([id, name]) => (
          <option key={id} value={id} className='font-bold text-slate-800 hover:text-slate-400 dark:text-white dark:bg-slate-800'>{name}</option>
        ))}
      </select>
    </div>
  );
};