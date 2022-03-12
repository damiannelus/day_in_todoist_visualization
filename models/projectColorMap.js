const projectColorMap = new Map([
  [30, '#b8256f'],
  [31, '#db4035'],
  [32, '#ff9933'],
  [33, '#fad000'],
  [34, '#afb83b'],
  [35, '#7ecc49'],
  [36, '#299438'],
  [37, '#6accbc'],
  [38, '#158fad'],
  [39, '#14aaf5'],
  [40, '#96c3eb'],
  [41, '#4073ff'],
  [42, '#884dff'],
  [43, '#af38eb'],
  [44, '#eb96eb'],
  [45, '#e05194'],
  [46, '#ff8d85'],
  [47, '#808080'],
  [48, '#b8b8b8'],
  [49, '#ccac93'],
])

function getProjectColorValue(key) {
  return projectColorMap.get(key) || '#f0f0f0';
}

export {getProjectColorValue}