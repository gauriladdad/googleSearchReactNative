# googleSearchReactNative
This is a react-native android project. It tries to mimick the google search as an app and displays results in much the same manner as google.

### Tools used

1. React-native
2. Android one plus one and one plus X
3. Sublime editor
4. SourceTree
5. NPM
6. Genymotion 

### Libraries/Components used

1. react-native-htmlview - Google search API results contain Content which is an HTML text. As there is no direct support for displaying html inside text component this component is being used.

2. ProgressBarAndroid - This is to indicate busy status while result is being fetched.

### Challenges faced : 
1. The listView component needs to be given an absolute height for it to show the scrollbar. (The listview ideally should take remaining width of the screen)Dimensions comes in handy to identify current screen height and width.

2. There is no direction support to identify change in rotation and render screen accordingly. I have made use of onLayout event of View component. Based on height/width of layout and using width/height retrieved from Dimension is used to identify whether device is in potrait mode or landscope.


### How to run this project

1. Please download the project zip and unzip it.
2. Go to command prompt at the location of zip, run npm install.
3. Type command react-native run-android. (At this point either the device or emulator should be present.)

