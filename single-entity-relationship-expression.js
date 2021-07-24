//#region Problem Statement
/**
 * Quick reports is a data analytics company that specializes in developing reporting software for analytics,
 * wants to develop a new feature for their upcoming version of software.
 * Given the relationship expressions between different related entities,
 * the objective of the new feature is to develop the ability to derive and output a single relationship expression in descending order of magnitude
 * starting with the entity having the higher order of magnitude on the left.
 * The input provided will be a list of related entities in comma-separated line
 * and the list of expressions defining the relationships between these entities, each in their own line.
 * The number of expressions given will be no less than n-1, if n is the number of entities
 */
//#endregion

//#region Input 1
/**
 * housingcomplex,sector,block,tower,apartment
 * housingcomplex = 8 sector
 * sector = 10 block
 * block = 3 tower
 * tower = 300 apartment
 * */
//#endregion

//#region Output 1
/**
 * 1housinghomplex = 8sector = 80block = 240tower = 72000apartment
 * */
//#endregion

//#region Input 2
/**
 * university, college, class, student
 * university = 6000 student
 * college = 600 student
 * class = 50 student
 * */
//#endregion

//#region Output 2
/**
 * 1university = 10college = 120class = 6000student
 * */
//#endregion

const inputString = `housingcomplex,sector,block,tower,apartment 
housingcomplex = 8 sector 
sector = 10 block 
block = 3 tower 
tower = 300 apartment`;

const inputLines = inputString.split('\n');

const listOfRelatedEntitiesString = inputLines.shift();
const listOfRelatedEntities = listOfRelatedEntitiesString.split(',').map(entity => entity.trim());

const bigToSmallMap = {};
const smallToBigMap = {};

for (const line of inputLines) {
  // Assumption: expression lines will be in the format of "<Entity_1> = <Magnitude> <Entity_2>"
  const lineSplit = line.trim().split(' ');
  const biggerEntity = lineSplit[0];
  const smallerEntity = lineSplit[lineSplit.length - 1];
  const magnitude = parseFloat(lineSplit[2]);
  bigToSmallMap[biggerEntity] = {smallerEntity, magnitude, depth: 1};
  smallToBigMap[smallerEntity] = {biggerEntity, magnitude: (1 / magnitude)};
}

const entityToSubTreeMap = {};

for (let entityMap of Object.values(bigToSmallMap)) {
  const {subTree, depthOfSubTree} = getTree(entityMap.smallerEntity, entityMap.magnitude);
  entityMap[entityMap.smallerEntity] = subTree[entityMap.smallerEntity];
  entityMap['depth'] += depthOfSubTree;
}

function getTree (entity, parentMagnitude) {
  if (entityToSubTreeMap[entity]) {
    return entityToSubTreeMap[entity];
  } else {
    let subTreeDetails;
    if (bigToSmallMap[entity]) {
      const entityMap = bigToSmallMap[entity];
      const {subTree, depthOfSubTree} = getTree(entityMap.smallerEntity, entityMap.magnitude);
      // console.log(`Entity: ${entity}`);
      subTreeDetails = {
        subTree: {
          [entity]: subTree,
          magnitude: parentMagnitude,
          depth: entityMap['depth'] + depthOfSubTree + 1,
          smallerEntity: entity
        },
        depthOfSubTree: entityMap['depth'] + depthOfSubTree,
      };
      // console.log(`subTreeDetails: ${JSON.stringify(subTreeDetails, null, 2)}`)
    } else {
      subTreeDetails = {
        subTree: {
          [entity]: {},
          magnitude: parentMagnitude,
          depth: 1,
          smallerEntity: entity
        },
        depthOfSubTree: 0,
      };
    }
    entityToSubTreeMap[entity] = subTreeDetails;
    return subTreeDetails;
  }
}
