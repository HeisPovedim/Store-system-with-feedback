// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract coursepaper {

    //BEGIN CONSTRUCTOR
    constructor() public {

        //Shops
        shopLists["Beer"] = 0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004;
        structShops[0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004] = structShop("Beer", get_hash("2"), 1000, 3, false, "1", "Moscow", 0);
        shopList.push(structShops[0x5412E9b0e4Ef9d1546DF79ae907eeE34bDCF3004].shopName);
        shopLists["Product"] = 0x49C364fedaD517382ee5A776d3071f11CfDE4C5c;
        structShops[0x49C364fedaD517382ee5A776d3071f11CfDE4C5c] = structShop("Product", get_hash("2"), 1000, 3, false, "2", "Petersburg", 0);
        shopList.push(structShops[0x49C364fedaD517382ee5A776d3071f11CfDE4C5c].shopName);

        //User
        structUserLogins["Peta"] = 0xAdA67460CF329D12c1ed898710CC8Da5D40d8025;
        structUsers[0xAdA67460CF329D12c1ed898710CC8Da5D40d8025] = structUser("Peta", get_hash("3"), 1000, 2, false);
        userLoginsArray.push("Peta");
        userAddressArray.push(0xAdA67460CF329D12c1ed898710CC8Da5D40d8025);
    }
//END CONSTRUCTOR

//BEGIN REACT FUNCTON
    //Functiong get hash
    function get_hash(string memory password) public pure returns(bytes32) {
            return(keccak256(abi.encodePacked(password)));
    }
    //Function cheack logged user
    function check_logged_user(string memory login) public view returns(bool) {
        return(structUsers[structUserLogins[login]].logged);
    }
    //Function cheack logged shop
    function check_logged_shop(string memory login) public view returns(bool) {
        return(structShops[shopLists[login]].logged);
    }
    //Function get role user
    function get_role_user(string memory login) public view returns(uint) {
        return(structUsers[structUserLogins[login]].role);
    }
    //Function get role shop
    function get_role_shop(string memory login) public view returns(uint) {
        return(structShops[shopLists[login]].role);
    }
    //Function get address for login
    function get_address(string memory login) public view returns(address) {
        address adr;
        if (structUserLogins[login] != address(0)) {
            adr = structUserLogins[login];
        } else {
            adr = shopLists[login];
        }
        return(adr);
    }
//END REACT FUNCTON

//BEGIN STRUCT
    //Struct shop
    struct structShop {
        string shopName;
        bytes32 password;
        uint256 ballance;
        uint role;          //1 - user, 2 - guest, 3 - shop
        bool logged;
        string number;
        string city;
        uint256 rating;
    }
    mapping (address => structShop) public structShops;
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
        bytes32 password;
        uint256 ballance;
        uint role;          //1 - guest, 2 - user, 3 - shop
        bool logged;
    }
    mapping(address => structUser) public structUsers;
    mapping(string => address) public structUserLogins;
    string[] userLoginsArray;
    address[] userAddressArray;

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
            structShops[msg.sender].ballance = structShops[msg.sender].ballance + structProducts[structStatusPurchases[idPurchase].titleProduct].price;
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
    //Function logged shop
    function login_shop(string memory login, bytes32 password) public {
        require(structShops[shopLists[login]].logged == false, "Error: You are already logged");
        require(shopLists[login] != address(0), "Error: User doesn't exist");
        require(structShops[shopLists[login]].password == password, "Error: Invalid password");
        structShops[shopLists[login]].logged = true;
    }
    //Function logged out shop
    function login_out_shop(string memory login) public {
        structShops[shopLists[login]].logged = false;
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
    //Function create user
    function create_user(address addr, string memory login, bytes32 password) public {
        require(structUserLogins[login] == address(0), "Error: User already exist");
        structUsers[addr] = structUser(login, password, 1000, 2, false);
        structUserLogins[login] = addr;
        userAddressArray.push(addr);
    }
    //Function logged user
    function login_user(string memory login, bytes32 password) public {
        require(structUsers[structUserLogins[login]].logged == false, "Error: You are already logged");
        require(structUserLogins[login] != address(0), "Error: User doesn't exist");
        require(structUsers[structUserLogins[login]].password == password, "Error: Invalid password");
        structUsers[structUserLogins[login]].logged = true;
    }
    //Function logged out user
    function login_out_user(string memory login) public {
        structUsers[structUserLogins[login]].logged = false;
    }
//END USER FUNCTION
}