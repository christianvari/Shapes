export function  isWebGLSupported() {

    try {

        var canvas = document.createElement( 'canvas' );
        return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

    } catch ( e ) {

        return false;

    }

}