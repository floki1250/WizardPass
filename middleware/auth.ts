export default defineNuxtRouteMiddleware((to, from) => {
  console.log("Auth middleware", to, from);
  const token = useState("token");
  if (!token.value) return navigateTo("/login");
});
