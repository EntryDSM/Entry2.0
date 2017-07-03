import React from 'react';
import ReactDOM from 'react-dom';
import { Input1, Input3, InputLayout, Footer }  from './components';

const rootContent = document.getElementById('root');
ReactDOM.render(<div><InputLayout /><Input1 /><Footer /></div>, rootContent);