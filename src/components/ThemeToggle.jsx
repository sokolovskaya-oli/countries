"use client";
import { useThemeToggle } from "../app/providers";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  color: ${({ theme }) => theme.text};

  &:hover {
    opacity: 0.7;
  }
`;

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeToggle();

  return <Button onClick={toggleTheme}>{isDark ? "🌞" : "🌙"}</Button>;
}
