// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error NotEnoughTokens();
error NotABaby();

contract BabyReveal is ERC20 {
    event Reveal(
        uint256 indexed tokenId
    );

    uint256 internal immutable costToReveal;
    uint256 internal constant _MAX_GENESIS_ID = 3332;

    constructor(uint256 initialSupply, uint256 _costToReveal) ERC20("BabyReveal", "BABY") {
        _mint(msg.sender, initialSupply);
        costToReveal = _costToReveal;
    }

    /**
     * @notice Reveal a baby
     * @param tokenId Identifier of the token to reveal
     */
    function revealBaby(uint256 tokenId) external {
        if (balanceOf(msg.sender) < costToReveal) 
            revert NotEnoughTokens();
        if (tokenId <= _MAX_GENESIS_ID) 
            revert NotABaby();

        _burn(msg.sender, costToReveal);
        emit Reveal(tokenId);
    }
}