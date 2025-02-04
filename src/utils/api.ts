export const fetchFromApi = async (endpoint: string, input: string | number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/${endpoint}/${input}`);
    if (!response.ok) {
      throw new Error("Error al realizar la petición");
    }
    return response.json();
  };