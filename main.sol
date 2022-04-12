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
        structUserLogins["Peta"] = 0x9c35a9bdf790A5Ce09b353B1C765269aB466Baad;
        structUsers[0x9c35a9bdf790A5Ce09b353B1C765269aB466Baad] = structUser("Peta" ,1, 1000);
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
    complaintBook[] complaintBooks;

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
        /*for (uint i = 0; i <= productList.length; i++) {
            if ()*/
            structProducts[title] = structProduct(msg.sender, description , price, addProductShop_idProduct);
            productList.push(title);
            addProductShop_idProduct++;
        /*}*/
        
    }
    
    //Function leave a feedback
    function leaveFeedback (string memory shop, string memory feedback, uint256 rating) public {
        require(rating <= 10,"error: rating can be from 1 to 10");
        for(uint i = 0; i <= shopList.length; i++) {
            string memory tempShopName = shopList[i];
            if(keccak256(abi.encodePacked(tempShopName)) == keccak256(abi.encodePacked(shop))) {                    
                string[] memory zerroArray;
                complaintBooks.push(complaintBook(shop, structUsers[msg.sender].userName, feedback, rating, zerroArray));
            }
        }
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
            structUsers[structMarriageRegistrations[idMarriageRegistration].userLogin].ballance = structUsers[structMarriageRegistrations[idMarriageRegistration].userLogin].ballance + structProducts[structMarriageRegistrations[idMarriageRegistration].titleProduct].price;
            structStatusReturns[idMarriageRegistration].status = false;
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
        for(uint i = 0; i < shopList.length; i++) {
            string memory tempShopName = shopList[i];
            if(keccak256(abi.encodePacked(tempShopName)) == keccak256(abi.encodePacked(shopName))) {                    
                for (i = 0; i <= complaintBooks.length; i++) {
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

    //Function leave a comment
    function leaveComment (string memory userName, string[] memory comment) public {
        for(uint i = 0; i < complaintBooks.length; i++) {
            string memory tempUserName = complaintBooks[i].userName;
            if(keccak256(abi.encodePacked(tempUserName)) == keccak256(abi.encodePacked(userName))) {                    
                complaintBooks[i].comments = comment;
            }
        }
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
    //Function get address for login
    function get_address(string memory login) public view returns(address) {
        return(structUserLogins[login]);
    }
    //Function create user
    function create_user(address addr, string memory login, bytes32 password, bytes32 secondPassword) public {
        require(msg.sender == 0xc50eC9589e3E3E7eb19c21fF552EB47cD218A8b6, "Error: You not a zero account");
        require(userAddresses[login] == address(0), "Error: User already exist");
        uint[] memory basketArray;
        users[addr] = User(login, password, 2, basketArray, true);
        userAddresses[login] = addr;
        UserList.push(addr);
    }
//END USER FUNCTION
}