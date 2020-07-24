import axios from 'axios';
import MutationsEmitter from './MutationsEmitter';

const api = axios.create({
  baseURL: '/api',
});

const rootElement = document.getElementById('root');

// Load root div html
api.get<string>('/monster')
  .then((response) => {
    rootElement.innerHTML = response.data;
  });

// Watch root div html
const documentObserver = new MutationsEmitter(rootElement);
documentObserver.on('mutation', () => {
  const { innerHTML } = rootElement;
  api.post('/monster', {
    update: innerHTML,
  });
});
