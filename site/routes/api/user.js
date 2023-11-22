/**
 * `./routes/api/`
 * ...is where we put file-based REST API endpoints
 * this one is accessible via https://<domain>/api/user
 */
export default eventHandler(() => {
  return {
    user: "AYO",
    date: new Date(),
  };
});
