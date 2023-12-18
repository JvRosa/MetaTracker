import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://tafnoqvfojluvdtyumas.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZm5vcXZmb2psdXZkdHl1bWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2OTM0NjcsImV4cCI6MjAxNjI2OTQ2N30.r4lQtdAlOmLkrrdbtuCs2JZbXaCj3YMn_GtLU3Bof2w'
);

export const criarMeta = async (texto: string, categoria: string, status: string, userId: string) => {
  let data, error;

  return { data, error } = await supabase
    .from('card')
    .insert({ texto, categoria, status, user_id: userId })
    .select();
};

export const listarMetas = async (userId: string) => {
  let data, error;

  return { data, error } = await supabase
    .from('card')
    .select()
    .eq('user_id', userId);

};

export const atualizarMeta = async (texto: string, categoria: string, status: string, data_terminou: string, id: string) => {
  let data, error;

  return { data, error } = await supabase
    .from('card')
    .update({ texto, categoria, status, data_terminou })
    .eq('id', id)
    .select();

};

export const trocarCategoria = async (newCategoriaId: string, cardId: string) => {
  let data, error;

  return { data, error } = await supabase
    .from('card')
    .update({ categoria: newCategoriaId })
    .eq('id', cardId)
    .select();

};


export const excluirMeta = async (cardId: string) => {
  let data, error;

  return { data, error } = await supabase
    .from('card')
    .delete()
    .eq('id', cardId)
    .select();

};
