import React, { useContext, useEffect, useState } from 'react';
import useHookCrud from '../../hooks/HookCrud';
import { ClientesContext } from '../../contextos/ClientesContext';
import { Button, Box } from '@mui/material';

const PageTeste = () => {

  const frutas = [
    "Maçã", "Banana", "Laranja", "Maçã", "Pera", "Maçã", 
    "Uva", "Manga", "Melancia", "Maçã", "Abacaxi"
];

console.log(frutas);

const contarFrutas = () => {
  const resultado = frutas.reduce((acumulador, itemAtual) => {
    if (acumulador[itemAtual]) {
      acumulador[itemAtual] += 1; 
    } else {
      acumulador[itemAtual] = 1; 
    }
    return acumulador; 
  }, {});
  
  return resultado;
}

console.log(contarFrutas());

  

  return (
    <div>
      
    </div>
  );
};

export default PageTeste;

