export const getClasses = (classes) => 
  classes
    .filter((item) => item !== '')
    .join(' ')
    .trim();

//在每個item之間加上空白並轉成字串，在去掉字串起始和結尾的空白