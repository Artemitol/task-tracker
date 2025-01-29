import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
} from "@sequelize/core"
import {
    Attribute,
    PrimaryKey,
    AutoIncrement,
    NotNull,
    HasMany,
    BelongsTo,
} from "@sequelize/core/decorators-legacy"

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare ExecutorId: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    @NotNull
    declare Name: string

    @Attribute(DataTypes.STRING)
    declare Email: string

    @Attribute(DataTypes.STRING)
    declare Role: string

    @Attribute(DataTypes.DATE)
    declare CreatedAt: CreationOptional<Date>

    @Attribute(DataTypes.STRING)
    declare BadgeUrl: string | null

    @Attribute(DataTypes.BOOLEAN)
    declare IsActive: boolean

    // Relations
    @HasMany(() => Task, "ExecutorId")
    declare Tasks?: NonAttribute<Task[]>
}

export class Task extends Model<
    InferAttributes<Task>,
    InferCreationAttributes<Task>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare TaskId: CreationOptional<number>

    @Attribute(DataTypes.STRING)
    declare Name: string

    @Attribute(DataTypes.STRING)
    declare Status: string

    @Attribute(DataTypes.INTEGER)
    declare ExecutorId: number

    // Relations
    @BelongsTo(() => User, "fk_User_Task")
    declare User?: NonAttribute<User>

    @HasMany(() => Properties, "TaskId")
    declare Properties?: NonAttribute<Properties[]>
}

export class PropertiesList extends Model<
    InferAttributes<PropertiesList>,
    InferCreationAttributes<PropertiesList>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare PropertyId: number

    @Attribute(DataTypes.STRING)
    declare Name: string

    @Attribute(DataTypes.TEXT)
    declare Description: string

    // Relations
    @HasMany(() => Properties, "PropertyId")
    declare Properties: NonAttribute<Properties[]>

    @HasMany(() => PropertiesValues, "PropertyId")
    declare PropertiesValues: NonAttribute<PropertiesValues[]>
}

export class PropertiesValues extends Model<
    InferAttributes<PropertiesValues>,
    InferCreationAttributes<PropertiesValues>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare ValueId: CreationOptional<number>

    @Attribute(DataTypes.INTEGER)
    declare PropertyId: number

    @Attribute(DataTypes.STRING)
    declare Value: string

    // Relations
    @HasMany(() => Properties, "ValueId")
    declare Values?: NonAttribute<PropertiesValues[]>

    @BelongsTo(() => PropertiesList, "fk_PropertiesList_PropertiesValues")
    declare PropertiesList?: NonAttribute<PropertiesList[]>
}

export class Properties extends Model<
    InferAttributes<Properties>,
    InferCreationAttributes<Properties>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    declare PropertyId: number

    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    declare TaskId: number

    @Attribute(DataTypes.INTEGER)
    declare ValueId: number | null

    // Relations
    @BelongsTo(() => Task, "fk_Task_Properties")
    declare Task?: NonAttribute<Task>

    @BelongsTo(() => PropertiesValues, "fk_PropertiesValues_Properties")
    declare PropertyValue?: NonAttribute<PropertiesValues>

    @BelongsTo(() => PropertiesList, "fk_PropertiesList_Properties")
    declare PropertiesList: NonAttribute<PropertiesList>
}
