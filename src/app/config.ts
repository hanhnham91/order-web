const config = {
  apiURL: import.meta.env.VITE_API_URL ?? "",
  stage: import.meta.env.VITE_STAGE ?? "LOCAL",
};

export default config;
