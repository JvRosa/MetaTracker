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
exports.signUp = exports.signInWithPassword = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)('https://tafnoqvfojluvdtyumas.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhZm5vcXZmb2psdXZkdHl1bWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2OTM0NjcsImV4cCI6MjAxNjI2OTQ2N30.r4lQtdAlOmLkrrdbtuCs2JZbXaCj3YMn_GtLU3Bof2w');
const signInWithPassword = (email, senha) => __awaiter(void 0, void 0, void 0, function* () {
    return supabase.auth.signInWithPassword({ email, password: senha });
});
exports.signInWithPassword = signInWithPassword;
const signUp = (email, senha) => __awaiter(void 0, void 0, void 0, function* () {
    return supabase.auth.signUp({ email, password: senha });
});
exports.signUp = signUp;
