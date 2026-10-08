# TwoOfTheSame

A REST API I built for my Server-Side Languages class. It manages two collections — Companies and Workers — with a "has a" relationship between them. A worker belongs to a company.

Built with Node.js, Express, Mongoose, and MongoDB.

## Getting Started

Clone the repo, then:

npm install

You'll need a `.env` file in the root with these two variables:

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/twoofthesame

Make sure MongoDB is running locally. If you're on a Mac and installed it through Homebrew:

brew services start mongodb-community@7.0

Then start the server:

npm run dev

You should see:
Server is running on port 3000
Connected to MongoDB: 127.0.0.1

## Endpoints

### Companies

- GET /api/companies — all companies
- GET /api/companies/:id — one company by id
- POST /api/companies — create a company
- PUT /api/companies/:id — update a company
- DELETE /api/companies/:id — delete a company

### Workers

- GET /api/workers — all workers, with their company populated
- GET /api/workers/:id — one worker by id
- POST /api/workers — create a worker
- PUT /api/workers/:id — update a worker
- DELETE /api/workers/:id — delete a worker

## The Relationship

A Worker has a Company. The Worker schema stores the company's `_id` as an ObjectId reference. When you fetch workers, I use `.populate("company")` so the response includes the full company document instead of just the id. That's how the "has a" part works.

When you create a worker, send the company's `_id` in the body:

{
"name": "Marissa Johnson",
"role": "HR Specialist",
"salary": 97000,
"company": "6ac2ee6044a154769e7639bb"
}

## Testing

The Postman collection is included in this repo. Import the JSON file into Postman, then run the collection to see all the tests pass.

## About

Brandon Carter
Server-Side Languages — WDV353
Full Sail University
