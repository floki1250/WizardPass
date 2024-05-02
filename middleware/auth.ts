export default defineNuxtRouteMiddleware((to, from) => {
  const password = useState("password");
  console.log(password.value);
  if (!password.value) return navigateTo("/login");
});
