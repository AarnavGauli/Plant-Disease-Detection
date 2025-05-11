// src/app/ui/form.js
import React from 'react';

export const Form = ({ children }) => (
  <form>{children}</form>
);

export const FormControl = ({ children }) => (
  <div className="form-control">{children}</div>
);

export const FormItem = ({ children }) => (
  <div className="form-item">{children}</div>
);

export const FormLabel = ({ children }) => (
  <label className="form-label">{children}</label>
);

export const FormMessage = ({ children }) => (
  <div className="form-message">{children}</div>
);

export const FormField = ({ children }) => (
  <div className="form-field">{children}</div>
);
