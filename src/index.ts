import colors from 'colors';
import server from './server';

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(colors.cyan(`REST API en el puerto ${port}`));
});
