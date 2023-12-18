"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirMeta = exports.trocarCategoria = exports.atualizarMeta = exports.listarMetas = exports.criarMeta = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)('https://tafnoqvfojluvdtyumas.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZm5vcXZmb2psdXZkdHl1bWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2OTM0NjcsImV4cCI6MjAxNjI2OTQ2N30.r4lQtdAlOmLkrrdbtuCs2JZbXaCj3YMn_GtLU3Bof2w');
const criarMeta = (texto, categoria, status, userId) => __awaiter(void 0, void 0, void 0, function* () {
    let data, error;
    return { data, error } = yield supabase
        .from('card')
        .insert({ texto, categoria, status, user_id: userId })
        .select();
});
exports.criarMeta = criarMeta;
const listarMetas = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let data, error;
    return { data, error } = yield supabase
        .from('card')
        .select()
        .eq('user_id', userId);
});
exports.listarMetas = listarMetas;
const atualizarMeta = (texto, categoria, status, data_terminou, id) => __awaiter(void 0, void 0, void 0, function* () {
    let data, error;
    return { data, error } = yield supabase
        .from('card')
        .update({ texto, categoria, status, data_terminou })
        .eq('id', id)
        .select();
});
exports.atualizarMeta = atualizarMeta;
const trocarCategoria = (newCategoriaId, cardId) => __awaiter(void 0, void 0, void 0, function* () {
    let data, error;
    return { data, error } = yield supabase
        .from('card')
        .update({ categoria: newCategoriaId })
        .eq('id', cardId)
        .select();
});
exports.trocarCategoria = trocarCategoria;
const excluirMeta = (cardId) => __awaiter(void 0, void 0, void 0, function* () {
    let data, error;
    return { data, error } = yield supabase
        .from('card')
        .delete()
        .eq('id', cardId)
        .select();
});
exports.excluirMeta = excluirMeta;
