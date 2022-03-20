// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract coursepaper {

    //BEGIN CONSTRUCTOR
    constructor() public {

        //Shops
        shops[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4] = structShop("Food", "1", "Moscow", 1000, 0);
        shopList.push(shops[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4].name);
        shops[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2] = structShop("Clothes", "2", "Petersburg", 1000, 0);
        shopList.push(shops[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2].name);
        shops[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db] = structShop("Pet Store", "3", "Ekaterinburg", 1000, 0);
        shopList.push(shops[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db].name);


        //User
        structUserLogins["Peta"] = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
        structUsers[0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB] = structUser("Peta" ,1, 1000);
        userLoginsArray.push("Peta");
}
//END CONSTRUCTOR

//BEGIN MODIFIER
//END MODIFIER

//BEGIN STRUCT
    //Struct shop
    struct structShop {
        string name;
        string number;      
        string city;        
        uint256 ballance;   
        uint256 rating;     
    }
    mapping (address => structShop) shops;
    mapping(string => address) public shopLists;
    string[] shopList;
    

    //Complaint book
    struct complaintBook {
        string shop;
        string userName;
        string feedback;
        uint rating;
        string[] comments;

    }
    //mapping(uint => complaintBook) public complaintBooks;
    complaintBook[] public complaintBooks;

    //Struct user
    struct structUser {
        string userName;
        uint256 password;   
        uint256 ballance;   
    }
    mapping(address => structUser) public structUsers;
    mapping(string => address) public structUserLogins;
    string[] userLoginsArray;

    //Struct product
    struct structProduct{
        address shop;
        string description;
        uint256 price;
        uint256 id;
    }
    mapping(string => structProduct) public structProducts;
    string [] productList;

    //Struct purchase status
    struct structStatusPurchase {
        address userLogin;
        string titleProduct;
        bool status;
    }
    structStatusPurchase[] public structStatusPurchases;

    //Struct return status
    struct structStatusReturn {
        address userLogin;
        string titleProduct;
        bool status;
    }
    structStatusReturn[] public structStatusReturns;

    //Struct marriage registration
    struct structMarriageRegistration {
        address userLogin;
        string titleProduct;
        bool status;
    }
    structMarriageRegistration[] public structMarriageRegistrations;
//END STRUCT

//BEGIN SHOP FUNCTION
    //Function adding a product
    uint256 addProductShop_idProduct = 0;
    function addProductShop (string memory title, uint256 price, string memory description) public {
        structProducts[title] = structProduct(msg.sender, description , price, addProductShop_idProduct);
        productList.push(title);
        addProductShop_idProduct++;
    }
    
    //Function leave a feedback
    uint countLeaveFeedback = 0;
    function leaveFeedback (string memory shop, string memory feedback, uint256 rating) public {
        require(rating <= 10,"error: rating can be from 1 to 10");
        string[] memory zerroArray;
        complaintBooks[countLeaveFeedback] = complaintBook(shop, structUsers[msg.sender].userName, feedback, rating, zerroArray);
        countLeaveFeedback++;
    }

    //Function acceptance of purchase
    function acceptPurchase (uint idPurchase, bool confirmation) public {
        if (confirmation == true) {
            structStatusPurchases[idPurchase].status = false;
            structUsers[structStatusPurchases[idPurchase].userLogin].ballance = structUsers[structStatusPurchases[idPurchase].userLogin].ballance - structProducts[structStatusPurchases[idPurchase].titleProduct].price;
            shops[msg.sender].ballance = shops[msg.sender].ballance + structProducts[structStatusPurchases[idPurchase].titleProduct].price;
        } else {
            structStatusPurchases[idPurchase].status = false;
        }
    }

    //Function acceptance of return
    function acceptReturn(uint idReturn, bool confirmation) public {
        if(confirmation == true) {
            structStatusReturns[idReturn].status = false;
            structUsers[structStatusReturns[idReturn].userLogin].ballance = structUsers[structStatusReturns[idReturn].userLogin].ballance + structProducts[structStatusReturns[idReturn].titleProduct].price;
        } else {
            structStatusReturns[idReturn].status = false;
        }
    }

    //Function marriage registration
    function MarriageRegistration(uint idMarriageRegistration, bool confirmation) public {
        if(confirmation == true) {
            structStatusReturns[idMarriageRegistration].status = false;
            structUsers[structMarriageRegistrations[idMarriageRegistration].userLogin].ballance = structUsers[structMarriageRegistrations[idMarriageRegistration].userLogin].ballance + structProducts[structMarriageRegistrations[idMarriageRegistration].titleProduct].price;
        } else {
            structStatusReturns[idMarriageRegistration].status = false;
        }
    }

    //Get list of stores
    function getShopList() public view returns(string[] memory) {
        return shopList;
    }

    //Get list of products
    function getProductList() public view returns(string[] memory) {
        return productList;
    }

    //Get story rating
    function getStoryRating(string memory shopName) public view returns(uint) {
        uint totalAverageValue = 0;
        uint countArrayRating = 0;
        uint complaintBooklength = complaintBooks.length;
        for(uint i = 0; i < shopList.length; i++) {
            string memory tempShopName = shopList[i];
            if(keccak256(abi.encodePacked(tempShopName)) == keccak256(abi.encodePacked(shopName))) {                    //
                for (i = 0; i <= complaintBooklength; i++) {
                    if(keccak256(abi.encodePacked(shopName)) == keccak256(abi.encodePacked(complaintBooks[i].shop))) {
                        countArrayRating += complaintBooks[i].rating;
                        totalAverageValue;
                    }
                }
            }
        }
        countArrayRating += countArrayRating / totalAverageValue;
        return countArrayRating;
    }
//END SHOP FUNCTION

//BEGIN USER FUNCTION
    //Function product purchase
    function productPurchases (string memory titleProduct) public {
        require(structUsers[msg.sender].ballance >= structProducts[titleProduct].price, "error: not money");
        structStatusPurchases.push(structStatusPurchase(msg.sender, titleProduct, true));
    }

    //Function product return
    function productReturn (string memory titleProduct) public {
        structStatusReturns.push(structStatusReturn(msg.sender, titleProduct, true));
    }

    //Function marriage registration
    function productMarriageRegistration (string memory titleProduct) public {
        structMarriageRegistrations.push(structMarriageRegistration(msg.sender, titleProduct, true));
    }
//END USER FUNCTION
    
}