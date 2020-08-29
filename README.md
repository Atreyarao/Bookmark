# Bookmark

About the Api:  
1) Bookmark:  
a) /addBookmark: It takes in 3 inputs Title,Link,Publisher(optional) and creates a new entry in the database.(Title,Link are unique).      
b) /deleteBookmark:It takes in Title as input and deletes that particular Bookmark  


2. Tags:  
a) /addTag: It takes in the title as input and creates  a new entry in the database   
b) /deleteTag: It takes in the name title and remove it from the Database.  
c) /addTagToBookmark: takes in 2 inputs the bookmark name and title of the tag and adds it to the entire Tag document (if exists ) to the Tags array in bookmark document.  
d) /removeTag: takes in 2 input the book mark name and title and removes the particular tag from the Tag array.  

3) Get All:    
a) /getBookmarks: Get all bookmarks stored in the database.    
b) /getTags; Gel all the Tags stored in the database. 


Link: https://bmark12.herokuapp.com/  
