/**
 *
 * @param {url} param
 */
function FsGlobe() {
  const mainContainer = document.querySelector("[earth-element='container']");

  const bgTexture = mainContainer.getAttribute('earth-img');

  const defaultValue = {
    url: bgTexture || 'https://raw.githubusercontent.com/PatelK09/HCI/main/img/earthmap1k.jpg',
  };

  const globeContainer = document.createElement('div');
  globeContainer.className = 'earth-container';

  mainContainer.appendChild(globeContainer);

  const canvas = document.createElement('canvas');

  canvas.className = 'canvas-3dglobe-container';
  globeContainer.appendChild(canvas);

  const userInfo = [].slice.call(document.querySelectorAll("[earth-element='tooltip']"));

  const marker = [].slice.call(document.querySelectorAll("[earth-element='pin']"));
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

  const fov = 60;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 10;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2.5;

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 1.2;
  controls.maxDistance = 4;
  controls.enableDamping = true;
  controls.campingFactor = 0.25;
  controls.enableZoom = false;
  controls.update();

  const scene = new THREE.Scene();
  //renderer.setClearColor(0x000000, 0);

  let renderRequested = false;
  let animationFrame;

  const topSongs = fetchDataFromCollection("[earth-element='list'] .w-dyn-item");

  const loader = new THREE.TextureLoader();
  const texture = loader.load(defaultValue.url, render);
  texture.needsUpdate = true;

  const geometry = new THREE.SphereBufferGeometry(1, 64, 32);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  material.map.needsUpdate = true;


  const stargeometry = new THREE.SphereGeometry(4, 64, 32);
  const starmaterial = new THREE.MeshBasicMaterial({

      map: new THREE.TextureLoader().load("https://raw.githubusercontent.com/PatelK09/HCI/main/img/galaxy.png"),
      side: THREE.BackSide
  });
  const starmesh = new THREE.Mesh(stargeometry, starmaterial);
  scene.add(starmesh);
  material.map.needsUpdate = true;



  function loadCountryData() {
    const lonFudge = Math.PI * 1.5;
    const latFudge = Math.PI;
    // these helpers will make it easy to position the boxes
    // We can rotate the lon helper on its Y axis to the longitude
    const lonHelper = new THREE.Object3D();
    // We rotate the latHelper on its X axis to the latitude
    const latHelper = new THREE.Object3D();
    lonHelper.add(latHelper);
    // The position helper moves the object to the edge of the sphere
    const positionHelper = new THREE.Object3D();
    positionHelper.position.z = 1;
    latHelper.add(positionHelper);

    const labelParentElem = document.createElement('div');
    labelParentElem.className = 'earth-labels';
    globeContainer.appendChild(labelParentElem);

    for (const [index, companyInfo] of topSongs.entries()) {
      const { lat, lon, name, url } = companyInfo;

      // adjust the helpers to point to the latitude and longitude
      lonHelper.rotation.y = THREE.MathUtils.degToRad(lon) + lonFudge;
      latHelper.rotation.x = THREE.MathUtils.degToRad(lat) + latFudge;

      // get the position of the lat/lon
      positionHelper.updateWorldMatrix(true, false);
      const position = new THREE.Vector3();
      positionHelper.getWorldPosition(position);
      companyInfo.position = position;

      // add an element for each country
      const elem = document.createElement('div');

      const infoBox = document.createElement('div');

      elem.className = 'map-container';
      infoBox.innerHTML =
        userInfo[index].outerHTML ||
        getInfoBox({
          url,
          name,
        });

      infoBox.className = 'earth-info-box';

      elem.style.cursor = 'pointer';

      const pin = document.createElement('div');
      pin.className = 'earth-arrow-box';

      if (!marker[index]) {
        const box = document.createElement('div');
        box.className = 'earth-arrow_box';
        const logo = document.createElement('img');
        logo.className = 'logo_dot';
        logo.position = 'relative';
        logo.setAttribute('alt', name);
        logo.setAttribute('src', url);
        logo.style.cursor = 'pointer';
        logo.style.width = '50px';
        box.appendChild(logo);
        pin.appendChild(box);
      } else {
        pin.appendChild(marker[index]);
      }

      elem.appendChild(pin);

      elem.appendChild(infoBox);
      labelParentElem.appendChild(elem);
      companyInfo.elem = elem;
    }
    requestRenderIfNotRequested();
  }
  loadCountryData();

  const tempV = new THREE.Vector3();
  const cameraToPoint = new THREE.Vector3();
  const cameraPosition = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();

  const settings = {
    minArea: 20,
    maxVisibleDot: -0.08,
  };

  function updateLabels() {
    const large = settings.minArea * settings.minArea;
    // get a matrix that represents a relative orientation of the camera
    normalMatrix.getNormalMatrix(camera.matrixWorldInverse);
    // get the camera's position
    camera.getWorldPosition(cameraPosition);
    for (const companyInfo of topSongs) {
      const { position, elem, area } = companyInfo;
      // large enough?
      if (area < large) {
        elem.style.opacity = '.009';
        elem.style.display = 'none';

        continue;
      }

      tempV.copy(position);
      tempV.applyMatrix3(normalMatrix);

      cameraToPoint.copy(position);
      cameraToPoint.applyMatrix4(camera.matrixWorldInverse).normalize();


      const dot = tempV.dot(cameraToPoint);

      // if the orientation is not facing us hide it.
      if (dot > settings.maxVisibleDot) {
        elem.style.opacity = '.009';
        elem.style.display = 'none';
        continue;
      }

      // restore the element to its default display style
      elem.style.opacity = '1';
      elem.style.display = '';

      // get the normalized screen coordinate of that position
      // x and y will be in the -1 to +1 range with x = -1 being
      // on the left and y = -1 being on the bottom
      tempV.copy(position);
      tempV.project(camera);

      // convert the normalized position to CSS coordinates
      const x = (tempV.x * 0.5 + 0.5) * canvas.clientWidth;
      const y = (tempV.y * -0.5 + 0.5) * canvas.clientHeight;

      // move the elem to that position
      elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;

      //   // set the zIndex for sorting
      elem.style.zIndex = ((-tempV.z * 0.5 + 0.5) * 100000) | 0;
    }
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    renderRequested = undefined;

    animationFrame = requestAnimationFrame(render);
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();

    updateLabels();

    renderer.render(scene, camera);
  }
  render();

  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      cancelAnimationFrame(animationFrame);
      renderRequested = true;
      animationFrame = requestAnimationFrame(render);
    }
  }

  

  // canvas.addEventListener("mousemove", onMousemove, false);
  controls.addEventListener('change', requestRenderIfNotRequested);
  window.addEventListener('resize', requestRenderIfNotRequested);
}

function getInfoBox({ url, name, location = 'N/A', role = 'N/A' }) {
  return `
  
    <div style=" border: 1px solid #dadce0; border-radius: 8px; overflow: hidden;">
      <div class="caption">
        <img src="${url}" style="height: 200px; max-width:600px;" />
      </div>
      <div style="padding:5px 10px">
        <div>
          <strong>${name}</strong>
        </div>
        <div>Javascript, Node.js</div>
        <div>${location}</div>
      </div>
    </div>
   `;
}

function fetchDataFromCollection(collectionWrapper) {
  const collection = [].slice.call(document.querySelectorAll(collectionWrapper));

  return collection.map((elem) => {
    return {
      name: (elem.querySelector("[earth-element='name'") || {}).textContent,
      lat: (elem.querySelector("[earth-element='lat'") || {}).textContent,
      lon: (elem.querySelector("[earth-element='lon'") || {}).textContent,
      url: (elem.querySelector("[earth-element='url'") || {}).textContent,
    };
  });
}



(function () {
  FsGlobe();
})();
