// Unit tests for the getAllCompanies function
// testing the select query, pagination and sorting

const { getAllCompanies } = require("../controllers/CompanyController");

const Company = require("../models/Company")

// lets get the mocked version to test with jest
// and mock the MODEL

jest.mock("../models/Company");

// use express to pass a req object with a .query property
const mockReq = (query) => ({ query });

// use express to pass a res object with a .json property
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}


// Lets set up the testing suite for them

// use .beforeEach to run before each test 
// and rest all mock state and set fake query chain

describe("getAllCompanies", () => {
    let mockQuery;

    beforeEach(() => {
        mockQuery = {
            select: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis([

                // Fake companies
                { _id: "1", name: "TechCorp", industry: "Software", foundedYear: 2015 },
        { _id: "2", name: "CN Solutions", industry: "Technology Services", foundedYear: 2018 },
        { _id: "3", name: "Older Co", industry: "Legacy", foundedYear: 1999 },
            ]),
        };

        // When we call the getAllCompanies function, we want to return the mock chain
        Company.find = jest.fn().mockReturnValue(mockQuery);
    });

    // Test 1 ---- Select Query

    // will verify that the controller reads ?select= from the url and passes the list to mongoose

    test("applies the select query to return limited fields", async () => {

        const req = mockReq({select: "name, industry"});
        const res = mockRes();

        await getAllCompanies(req, res);

        // The controller should call 
        // Company.find() with the select query
        expect(Company.find).toHaveBeenCalled();
        // and the list of companies
        expect(Company.find).toHaveBeenCalledWith("name, industry")

        // and then will return a 200 status code with data
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({success: true})
        );
    });

    // Test 2 ----- Pagination
    
    // will verify that the controller reads ?page= and ?limit= are converted

    test("applies pagination with worrect skips and limit", async () => {

        const req = mockReq({page: "2", limit: "5"});
        const res = mockRes();

        await getAllCompanies(req, res);

        expect(mockQuery.skip).toHaveBeenCalledWith(5);
    }
    )
}