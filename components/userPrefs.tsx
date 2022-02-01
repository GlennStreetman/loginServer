function UserPrefs() {
    if (typeof window !== "undefined" && localStorage) {
        return (
            <style jsx global>
                {`
                    .userDark {
                        ${localStorage.backgroundPrimaryD ? "--color-bg-primary-user:" + localStorage.backgroundPrimaryD : ""};
                        ${localStorage.backgroundSecondaryD ? "--color-bg-secondary-user:" + localStorage.backgroundSecondaryD : ""};
                        ${localStorage.textPrimaryD ? "--color-text-primary-user:" + localStorage.textPrimaryD : ""};
                        ${localStorage.textSecondaryD ? "--color-text-secondary-user:" + localStorage.textSecondaryD : ""};
                        ${localStorage.textAccentD ? "--color-text-accent-user:" + localStorage.textAccentD : ""};
                        ${localStorage.highlightStrongD ? "--color-hover-strong-user:" + localStorage.highlightStrongD : ""};
                        ${localStorage.highlightWeakD ? "--color-hover-weak-user:" + localStorage.highlightWeakD : ""};
                    }
                    .userLight {
                        ${localStorage.backgroundPrimaryL ? "--color-bg-primary-user:" + localStorage.backgroundPrimaryL : ""};
                        ${localStorage.backgroundSecondaryL ? "--color-bg-secondary-user:" + localStorage.backgroundSecondaryL : ""};
                        ${localStorage.textPrimaryL ? "--color-text-primary-user:" + localStorage.textPrimaryL : ""};
                        ${localStorage.textSecondaryL ? "--color-text-secondary-user:" + localStorage.textSecondaryL : ""};
                        ${localStorage.textAccentL ? "--color-text-accent-user:" + localStorage.textAccentL : ""};
                        ${localStorage.highlightStrongL ? "--color-hover-strong-user:" + localStorage.highlightStrongL : ""};
                        ${localStorage.highlightWeakL ? "--color-hover-weak-user:" + localStorage.highlightWeakL : ""};
                    }
                `}
            </style>
        );
    } else {
        return <></>;
    }
}

export default UserPrefs;
