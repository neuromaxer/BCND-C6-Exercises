pragma solidity >=0.7.0 <0.9.0;
import "../../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ExerciseC6CApp {
    using SafeMath for uint256;

    address private contractOwner;
    IExerciseC6C exerciseC6C;

    modifier requireContractOwner(){
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _; 
    }

    constructor(address dataContract) public {
        contractOwner = msg.sender;
        exerciseC6C = IExerciseC6C(dataContract);
    }

    function calculateBonus(uint256 sales) internal view requireContractOwner returns(uint256) {
        if (sales < 100) {
            return sales.mul(5).div(100);
        } else if (sales < 500) {
            return sales.mul(7).div(100);
        } else {
            return sales.mul(10).div(100);
        }
    }

    function addSale(string memory id, uint256 amount) external requireContractOwner {
        exerciseC6C.updateEmployee(id, amount, calculateBonus(amount));
    }

}

// interfaces should start with I 
// https://forum.openzeppelin.com/t/warning-duplicate-contract-names-found-for-a-with-contract-and-interface-with-same-name/6877
interface IExerciseC6C {
    function updateEmployee(string memory id, uint256 sales, uint256 bonus) external;
}