# Guia de Estilos do Projeto

## Variáveis CSS

```css
:root {
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --secondary: #64748b;
  --accent: #f59e0b;
  --background: #f8fafc;
  --foreground: #1e293b;
}
```

## Layout Base

### Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

### Grid System

```css
.grid {
  display: grid;
  gap: 1rem;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
```

## Componentes

### Cards

```css
.card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.card-header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--foreground);
}
```

### Botões

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-secondary {
  background: var(--secondary);
  color: white;
}

.btn-danger {
  background: #ef4444;
  color: white;
}
```

### Formulários

```css
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--foreground);
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

## Utilitários

### Espaçamento

```css
.m-1 {
  margin: 0.25rem;
}
.m-2 {
  margin: 0.5rem;
}
.m-3 {
  margin: 0.75rem;
}
.m-4 {
  margin: 1rem;
}

.p-1 {
  padding: 0.25rem;
}
.p-2 {
  padding: 0.5rem;
}
.p-3 {
  padding: 0.75rem;
}
.p-4 {
  padding: 1rem;
}
```

### Texto

```css
.text-sm {
  font-size: 0.875rem;
}
.text-base {
  font-size: 1rem;
}
.text-lg {
  font-size: 1.125rem;
}
.text-xl {
  font-size: 1.25rem;
}

.font-normal {
  font-weight: 400;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600;
}
.font-bold {
  font-weight: 700;
}
```

### Cores

```css
.text-primary {
  color: var(--primary);
}
.text-secondary {
  color: var(--secondary);
}
.text-accent {
  color: var(--accent);
}

.bg-primary {
  background-color: var(--primary);
}
.bg-secondary {
  background-color: var(--secondary);
}
.bg-accent {
  background-color: var(--accent);
}
```

## Animações

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.slide-in {
  animation: slideIn 0.3s ease-in-out;
}
```

## Responsividade

```css
@media (max-width: 640px) {
  .container {
    padding: 0 0.5rem;
  }

  .card {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .hide-mobile {
    display: none;
  }
}

@media (min-width: 769px) {
  .hide-desktop {
    display: none;
  }
}
```

## PrimeNG Customizações

### Botões

```css
.p-button {
  background: var(--primary);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.p-button:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}
```

### Inputs

```css
.p-inputtext {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.p-inputtext:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Tabelas

```css
.p-datatable {
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.p-datatable .p-datatable-header {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem;
}

.p-datatable .p-datatable-thead > tr > th {
  background: #f8fafc;
  color: var(--foreground);
  font-weight: 600;
  padding: 1rem;
}
```

## Acessibilidade

```css
:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```
