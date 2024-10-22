module.exports = {
  apps: [
    {
      name: "back_rifas",
      script: "npm",
      args: "run start:prod",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
