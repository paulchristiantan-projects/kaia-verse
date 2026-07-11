import React, { createContext, useContext, useState } from 'react';

const MemberContext = createContext();

export const useMember = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
};

export const MemberProvider = ({ children }) => {
  const [selectedMember, setSelectedMember] = useState('angela');

  return (
    <MemberContext.Provider value={{ selectedMember, setSelectedMember }}>
      {children}
    </MemberContext.Provider>
  );
};
