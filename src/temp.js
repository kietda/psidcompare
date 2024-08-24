const newItemImportExport = {
  idItem: currentId ? currentId : currentItem.currentId,
  supplier: supplier,
  timedate: moment(timedate).format("L"),
  boolImport: true,
  numberBox: quantityOfBox,
  quantityPerBox: quantityOfItemPerBox,
};

moment().format("L");
