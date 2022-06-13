import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

const headers = (authCode) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (authCode) {
    headers["Authorization"] = authCode;
  }
  return headers;
};

/**
 * Hook to store and retrieve alphatwts
 * @returns
 */
export const useAlphaTwt = () => {
  const { code } = useContext(AuthContext);

  /**
   * Creates an alphatwt
   * @param alphatwt
   * @returns
   */
  const create = async (alphatwt) => {
    if (!code) {
      throw new Error("Missing authentication");
    }
    const post = await fetch("/api/alphatwt", {
      method: "POST",
      headers: headers(code),
      body: JSON.stringify({
        alphatwt,
      }),
    });
    return post.json();
  };

  /**
   * Retrieves an alphatwt
   * @param id
   * @returns
   */
  const retrieve = async (id) => {
    // We don't require auth...
    const post = await fetch(`/api/alphatwt/${id}`, {
      headers: headers(code),
    });
    return post.json();
  };

  /**
   * Retrieves the list of alphatwts for the logged in user
   * @returns
   */
  const list = async () => {
    if (!code) {
      throw new Error("Missing authentication");
    }
    const archive = await fetch("/api/alphatwt/archive", {
      headers: headers(code),
    });
    return archive.json();
  };

  return {
    create,
    retrieve,
    list,
  };
};

export default useAlphaTwt;
