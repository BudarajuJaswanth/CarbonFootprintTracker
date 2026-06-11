import { app } from './index';

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
