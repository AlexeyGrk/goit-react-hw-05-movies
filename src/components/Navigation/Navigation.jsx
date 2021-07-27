import React from "react";

import { NavigationContainer, NavigationLink } from "./Navigation.styled";

const Navigation = () => {
  return (
    <NavigationContainer>
      <NavigationLink to="/" exact>
        Home
      </NavigationLink>
      <NavigationLink to="/movies">Movies</NavigationLink>
    </NavigationContainer>
  );
};

export default Navigation;
