// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BabyReveal is ERC20 {

    uint256 public immutable costToReveal;

    constructor(uint256 initialSupply, uint256 _costToReveal) ERC20("BabyReveal", "BABY") {
        _mint(msg.sender, initialSupply);
        costToReveal = _costToReveal;
    }

    /**
     * @notice Reveal a baby
     * @param tokenId Identifier of the token to reveal
     */
    function revealBaby(uint256 tokenId) external {
        require(balanceOf(msg.sender) >= costToReveal, "Not enough tokens");
        _burn(msg.sender, costToReveal);
    }
}