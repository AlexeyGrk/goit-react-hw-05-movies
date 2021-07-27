import styled from "@emotion/styled/macro";
import { NavLink } from "react-router-dom";
export const NavigationContainer = styled.div`
  padding: 15px;
`;
export const NavigationLink = styled(NavLink)`
  text-decoration: none;

  color: #494949 !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #ffffff;
  padding: 20px;
  border: 4px solid #494949 !important;
  display: inline-block;
  transition: all 0.4s ease 0s;
  margin: 5px;
  &:hover {
    color: #ffffff !important;
    background: #f6b93b;
    border-color: #f6b93b !important;
    transition: all 0.4s ease 0s;
  }
`;
