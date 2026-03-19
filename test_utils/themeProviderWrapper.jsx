import React from 'react';
import { render } from "@testing-library/react-native"; 
import ThemeProvider from "../customHooks/themeProvider";

const providers = ({children}) => {
    return render (
      <ThemeProvider>
        {children}
      </ThemeProvider>
    );
};

const customRender = (ui) => {
  render(ui, {providers});
};

export * from '@testing-library/react-native';
export {customRender}