
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "Zip", "City");
customer.changeAddress(address);

const MockRepository = () =>{
    return { 
        find: jest.fn().mockResolvedValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit Test find customer usecase", () => {
    
    it("should find a customer", async () => {
       
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "Zip", "City");
        customer.changeAddress(address);
       
        await customerRepository.create(customer);

        const input = {
            "id": "123"
        }

        const output = {
            "id": "123",
            "name": "John",
            "address": {
                "street": "Street",
                "number": 123,
                "zip": "Zip",
                "city": "City"               
            }
        }

        const result = await usecase.execute(input);
       
        expect(result).toEqual(output);
    });
});
