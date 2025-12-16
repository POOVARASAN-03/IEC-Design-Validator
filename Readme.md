# IEC Design Validator

AI-powered cable design validation tool using Gemini API and IEC standards.

## Features

- Free text or JSON input for cable design specifications
- AI-based validation against IEC 60502-1 and IEC 60228 standards
- Real-time confidence scoring
- Detailed validation results with reasoning

## Tech Stack

**Frontend:** Next.js 15, React, Material-UI, TypeScript  
**Backend:** NestJS, Google Gemini AI, TypeScript

## Setup

### Prerequisites

- Node.js 18+
- Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/POOVARASAN-03/IEC-Design-Validator.git
cd IEC-Design-Validator
```

2. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Configure environment variables:

Create `backend/.env`:

```
GEMINI_API_KEY=your_api_key_here
```

### Running the Application

**Backend (port 3000):**

```bash
cd backend
npm run start:dev
```

**Frontend (port 3001):**

```bash
cd frontend
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Usage

1. Select input type (Free Text or JSON)
2. Enter cable design specifications
3. Click "Validate Design"
4. View validation results and AI reasoning

## Example Input

**Free Text:**

```
Cable: 10 sqmm Cu conductor, PVC 1.0mm insulation, 0.6/1 kV
```

**JSON:**

```json
{
  "voltage": "0.6/1 kV",
  "conductor": { "material": "Cu", "size": 10 },
  "insulation": { "material": "PVC", "thickness": 1.0 }
}
```

## License

MIT
