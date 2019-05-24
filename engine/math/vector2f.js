class Vector2f {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    lengthSquared = () => {
        return x * x + y * y;
    }

    length = () => {
        return Math.sqrt(lengthSquared());
    }
    
    getAngle = (vec) => {
        return getRadAngle(vec)*(180/Math.PI);
    }
    
    copy = () => {
        return new Vector2f(this.x, this.y);
    }
    
    getRadCos = (vec) => {
    	let temp1 = this.copy().normalize();
        let temp2 = vec.copy().normalize();

        return temp1.dot(temp2);
    }

    getRadSin = (vec) => {
    	let temp1 = this.copy().normalize();
    	let temp2 = vec.copy().normalize();

        return (temp1.x * temp2.y) - (temp1.y * temp2.x);
    }

    getRadAngle = (vec) => {
        let sine, cosine, angle;
        let temp = vec;
        let right = new Vector2f(1.0, 0.0);

        sine = right.getRadSin(temp);
        cosine = temp.getRadCos(right);

        sine = Math.asin(sine);
        cosine = Math.acos(cosine);

        if (sine < 0) {
            angle = -1 * cosine;
        } else {
            angle = cosine;
        }

        return angle > 0 ? angle : angle + (2.0 * Math.PI);
    }

    normalize = () => {
        return divide(length());
    }

    add = (other) => {
        let x = this.x + other.x;
        let y = this.y + other.y;
        return new Vector2f(x, y);
    }

    negate = () => {
        return scale(-1);
    }

    subtract = (other) => {
        return this.add(other.negate());
    }

    scale = (scalar) => {
        let x = this.x * scalar;
        let y = this.y * scalar;
        return new Vector2f(x, y);
    }

    divide = (scalar) => {
        return scale(1 / scalar);
    }

    dot = (other) => {
        return this.x * other.x + this.y * other.y;
    }

    lerp = (other, alpha) => {
        return this.scale(1 - alpha).add(other.scale(alpha));
    }

	set = (x, y) => {
		this.x = x;
		this.y = y;
	}
}

export { Vector2f };