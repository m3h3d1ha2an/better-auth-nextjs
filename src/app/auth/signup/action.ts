"use server";
type SignupAction = (_prevState: undefined, formData: FormData) => Promise<void>;

export const signupWithEmail: SignupAction = async (_prevState: undefined, formData: FormData) => {
  const data = await Object.fromEntries(formData);
  console.log(data);
  // async () => {
  //   await authClient.signUp.email({
  //     email,
  //     password,
  //     name: `${firstName} ${lastName}`,
  //     image: image ? await convertImageToBase64(image) : "",
  //     callbackURL: "/dashboard",
  //     fetchOptions: {
  //       onResponse: () => {
  //         setLoading(false);
  //       },
  //       onRequest: () => {
  //         setLoading(true);
  //       },
  //       onError: (ctx) => {
  //         toast.error(ctx.error.message);
  //       },
  //       onSuccess: async () => {
  //         router.push("/dashboard");
  //       },
  //     },
  //   });
  // }
};
