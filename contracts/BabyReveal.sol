// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

error NotEnoughTokens();

contract BabyReveal is ERC20 {
    event Reveal(
        uint256 indexed tokenId
    );

    uint256 internal immutable costToReveal;

    constructor(uint256 initialSupply, uint256 _costToReveal) ERC20("BabyReveal", "BABY") {
        _mint(msg.sender, initialSupply);
        costToReveal = _costToReveal;
    }

    /**
     * @notice Reveal a baby
     * @param tokenId Identifier of the token to reveal
     */
    function revealBaby(uint256 tokenId) external {
        if (balanceOf(msg.sender) < costToReveal) {
            revert NotEnoughTokens();
        }

        _burn(msg.sender, costToReveal);
        emit Augment(traitId, tokenId, token);
    }
}