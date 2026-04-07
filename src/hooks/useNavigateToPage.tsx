import { useNavigate } from "react-router-dom";
import { TValidPaths } from "../router";

/**
 * This hook is used to navigate to any page on the application while allowing
 * intellisense on all pages on the application
 * @returns The function to navigate to a page
 */
export const useNavigateToPage = () => {
  const navigate = useNavigate();

  const navigateToPage = (
    path: TValidPaths,
    params: Record<string, any> = {}
  ) => {
    navigate(path, { state: params });
  };

  return navigateToPage as (
    path: TValidPaths,
    params?: Record<string, any>
  ) => void;
};
